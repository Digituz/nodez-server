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
