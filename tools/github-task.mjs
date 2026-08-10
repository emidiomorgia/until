#!/usr/bin/env node

/**
 * Cross-platform GitHub issue helper for the structured task workflow.
 * Requires Node.js 18+ and GITHUB_TOKEN or GH_TOKEN for API operations.
 */

const API_VERSION = '2022-11-28';

function usage() {
  console.error(`Usage:
  node tools/github-task.mjs create --title "..." --body-file path [--repo owner/name]
  node tools/github-task.mjs get --issue 12 [--repo owner/name]
  node tools/github-task.mjs update-body --issue 12 --body-file path [--repo owner/name]
  node tools/github-task.mjs comment --issue 12 --body-file path [--repo owner/name]
  node tools/github-task.mjs close --issue 12 [--repo owner/name]
  node tools/github-task.mjs open --issue 12 [--repo owner/name]

Environment:
  GITHUB_TOKEN or GH_TOKEN   GitHub token with Issues: write permission for mutations
  GITHUB_REPOSITORY          owner/name, used when --repo is omitted
`);
  process.exit(2);
}

function parseArgs(argv) {
  const [command, ...rest] = argv;
  const args = { command };
  for (let index = 0; index < rest.length; index += 1) {
    const token = rest[index];
    if (!token.startsWith('--')) usage();
    const key = token.slice(2);
    if (key === 'repo' || key === 'issue' || key === 'title' || key === 'body-file') {
      args[key] = rest[index + 1];
      index += 1;
    } else {
      usage();
    }
  }
  return args;
}

function required(value, name) {
  if (!value) {
    console.error(`Missing required argument: --${name}`);
    usage();
  }
  return value;
}

async function readBody(file) {
  const fs = await import('node:fs/promises');
  return fs.readFile(required(file, 'body-file'), 'utf8');
}

function repository(args) {
  return required(args.repo || process.env.GITHUB_REPOSITORY, 'repo');
}

function token() {
  return required(process.env.GITHUB_TOKEN || process.env.GH_TOKEN, 'GITHUB_TOKEN or GH_TOKEN');
}

async function github(args, method, path, body) {
  const response = await fetch(`https://api.github.com/repos/${repository(args)}${path}`, {
    method,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token()}`,
      'X-GitHub-Api-Version': API_VERSION,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await response.text();
  let result;
  try {
    result = JSON.parse(text);
  } catch {
    result = text;
  }
  if (!response.ok) {
    throw new Error(`GitHub API ${response.status}: ${typeof result === 'string' ? result : result.message}`);
  }
  return result;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.command) usage();

  let result;
  if (args.command === 'create') {
    result = await github(args, 'POST', '/issues', {
      title: required(args.title, 'title'),
      body: await readBody(args['body-file']),
    });
  } else if (args.command === 'get') {
    result = await github(args, 'GET', `/issues/${required(args.issue, 'issue')}`);
  } else if (args.command === 'update-body') {
    result = await github(args, 'PATCH', `/issues/${required(args.issue, 'issue')}`, {
      body: await readBody(args['body-file']),
    });
  } else if (args.command === 'comment') {
    result = await github(args, 'POST', `/issues/${required(args.issue, 'issue')}/comments`, {
      body: await readBody(args['body-file']),
    });
  } else if (args.command === 'close' || args.command === 'open') {
    result = await github(args, 'PATCH', `/issues/${required(args.issue, 'issue')}`, {
      state: args.command === 'close' ? 'closed' : 'open',
    });
  } else {
    usage();
  }

  console.log(JSON.stringify({ number: result.number, html_url: result.html_url, url: result.url }, null, 2));
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
