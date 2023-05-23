const bodyParser = require("body-parser");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const Stripe = require("stripe")(
  "sk_test_51NAn3DSGSe2hPQwLVnYTmEGc9Ew1TVH202uDlwhougffyaQLEO4Q96Y69kmtdtpo4yTjPzRXSKuibYeb6kLN50o400f0ruu0rK"
);

const app = express();
app.use(bodyParser());

const PORT: number = parseInt(process.env.PORT || "5000", 10);

app.use(express.json());
app.use(cors());

app.use("/pay", (req: any, res: any) => {
  console.log(req.body.token);
  const { token, amount } = req.body;
  const idempotencyKey = uuidv4();

  return Stripe.customers
    .create({
      email: token.email,
      source: token,
    })
    .then((customers: { id: any }) => {
      Stripe.charges.create(
        {
          amount: amount * 100,
          currency: "irn",
          customers: customers.id,
          receipt_email: token.email,
        },
        { idempotencyKey }
      );
    })
    .then((result: any) => {
      res.status(200).json(result);
    })
    .catch((err: any) => {
      console.log(err);
    });
});

app.listen(PORT, () => console.log("Server running on port " + PORT));
