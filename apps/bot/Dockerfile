FROM node:18.14.2-alpine

RUN apk add --no-cache libc6-compat
RUN apk update

RUN addgroup -S nodejs && adduser -S nodejs -G nodejs

RUN mkdir /app && chown -R nodejs:nodejs /app

WORKDIR /app

USER nodejs

COPY --chown=nodejs:nodejs  ["build", "package.json","./"]

ENV NODE_ENV production
ENV PORT 3000


ENV DISCORD_BOT_TOKEN=MTEwNTU5NDgwMzQ5Nzk5MjMyMg.G6m_b9.fVEav5TCT_dXbEAkkp_vDBPG26KpEGcO1fZe5g
ENV DISCORD_CHANNEL_ID=1105597620673577090
ENV DISCORD_ONAPPLICATION_TAG=<@&1106321524174098443>
ENV PORT=5174
EXPOSE 3000

CMD [ "node", "main.cjs"  ]