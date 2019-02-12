const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const webhook = require('./webhook');
const pubKey = functions.config().paddle.pub_key;

exports.info = functions.https.onRequest((req, res) => {
    res.send(`Hello from ${process.env.GCLOUD_PROJECT}!`);
});

exports.webhook = functions.https.onRequest((req, res) => {
    if(req.body && req.body.p_signature) {
        const result = webhook.validate(req.body, pubKey);
        if(result) {
            if(req.body.alert_name === 'subscription_created') {
                const subscription = {
                    cancel_url: req.body.cancel_url,
                    checkout_id: req.body.checkout_id,
                    currency: req.body.currency,
                    email: req.body.email,
                    event_time: req.body.event_time,
                    marketing_consent: req.body.marketing_consent,
                    next_bill_date: req.body.next_bill_date,
                    passthrough: req.body.passthrough,
                    quantity: req.body.quantity,
                    status: req.body.status,
                    subscription_id: req.body.subscription_id,
                    subscription_plan_id: req.body.subscription_plan_id,
                    unit_price: req.body.unit_price,
                    update_url: req.body.update_url
                };
                console.log(subscription);

                const db = admin.firestore();
                db.collection('test_user_subscriptions')
                    .doc(subscription.subscription_id)
                    .set(subscription)
                    .then(function() {
                        console.log('created');
                        res.send('Accepted');
                    });
                
            } else {
                console.warn(`unsupported alert ${req.body.alert_name}`);
                res.send(`unsupported alert ${req.body.alert_name}`);
            }

            
        } else {
            res.send('Invalid signature');
        }
    } else {
        res.send('Invaid request');
    }
});