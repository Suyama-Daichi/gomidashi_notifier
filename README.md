# typescript-node-base

TypeScript + Node.js + lambda project boilerplate.

# Usage

## Make a program
You can write your code to `src/index.ts`.

## Compile
```bash
npm run build
```

To be Compilied to `dist`.

## Deploy to AWS Lambda
```bash
npm run deploy
```

You can setting params in `.env` file.

.env
```env
AWS_ENVIRONMENT=development
AWS_ACCESS_KEY_ID={IAM_ACCESS_KEY}
AWS_SECRET_ACCESS_KEY={IAM_SECRET_ACCESS_KEY}
AWS_PROFILE=default
AWS_SESSION_TOKEN=
AWS_ROLE_ARN={arn}
AWS_REGION=ap-northeast-1
AWS_FUNCTION_NAME=function
AWS_HANDLE=index.handler
AWS_MEMORY_SIZE=128
AWS_TIMEOUT=3
AWS_DESCRIPTION=
AWS_RUNTIME=nodejs12.x
AWS_VPC_SUBNETS=
AWS_VPC_SECURITY_GROUPS=
AWS_TRACING_CONFIG=
AWS_LOGS_RETENTION_IN_DAYS=
EXCLUDE_GLOBS="index.js.map caller.js caller.js.map"
PACKAGE_DIRECTORY=dist
```



# License

[ISC License](./LICENSE)
