## Deploying on Docker

Install Node:

```bash
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Then, you will need a Docker network:

```bash
docker network create digituz
```

Then, you can start it:

```bash
# clone
git clone https://github.com/Digituz/nodez-server.git ~/nodez-server
cd ~/nodez-server
npm i

# build the nginx image
node src/index.js
```

> **Note:** You might need to `apt-get install build-essential` and `apt install libssl-dev`.

## Development Tips

Add `ligituz.com` (ligituz = local digituz :D) to point to `locahost` and reload it.

```bash
# append digtz.com
echo '127.0.0.1 ligituz.com' | sudo tee -a /etc/hosts

# reload config
sudo killall -HUP mDNSResponder
```


```bash
node src/index.js deploy --repository brunokrebs/hello-world-express --subdomain hello --port 3000
```
