### Config Paddle public key
- Download and save to file `paddle.pub_key`
- `firebase functions:config:set paddle.pub_key="$(cat paddle.pub_key)"`
- `firebase deploy`