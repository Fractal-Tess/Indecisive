FROM node:18.14.2-alpine

RUN apk add --no-cache libc6-compat
RUN apk update

RUN addgroup -S nodejs && adduser -S nodejs -G nodejs

RUN mkdir /app && chown -R nodejs:nodejs /app

WORKDIR /app

USER nodejs

COPY --chown=nodejs:nodejs  ["./build/", "package.json","./"]

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

CMD [ "node", "index.js"  ]