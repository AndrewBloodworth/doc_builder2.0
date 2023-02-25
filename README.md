API KEY:
37ae1b1611e439f1cd5c5c87056745dc2b8f7994e3b9bc7455353560d8e6d070

Droplet Password:
U?3w2a9qJ?XZ39n

DB INFO:
username = doadmin
password = mYnGuHhzqFFQ7aVA
host = db-postgresql-nyc3-65242-do-user-1759273-0.b.db.ondigitalocean.com
port = 25060
database = defaultdb
sslmode = require

ENV JWT=SuperFakeKey
ENV NODE_ENV=production
ENV SEED=TRUE
ENV DATABASE_NAME=defaultdb
ENV DATABASE_USER_NAME=doadmin
ENV DATABASE_PASSWORD=mYnGuHhzqFFQ7aVA
ENV DATABASE_HOST=db-postgresql-nyc3-65242-do-user-1759273-0.b.db.ondigitalocean.com
ENV DATABASE_PORT=25060

RUN apt-get update \
 && apt-get install -y wget gnupg ca-certificates \
 && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
 && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
 && apt-get update \
 # We install Chrome to get all the OS level dependencies, but Chrome itself # is not actually used as it's packaged in the node puppeteer library. # Alternatively, we could could include the entire dep list ourselves # (https://github.com/puppeteer/puppeteer/blob/master/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix) # but that seems too easy to get out of date.
&& apt-get install -y google-chrome-stable \
 && rm -rf /var/lib/apt/lists/\* \
 && wget --quiet https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/sbin/wait-for-it.sh \
 && chmod +x /usr/sbin/wait-for-it.sh
