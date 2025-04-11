export const useMakePayment = () => {
  console.log("useMakePayment HOOK CALLED");
  return async function makePayment({ productId = null, onSuccess, navigate }) {
    const key = process.env.REACT_APP_RAZORPAY_API_KEY;

    try {
      const res = await fetch("https://helpkey-backend.vercel.app//api/razorpay");
      const { order } = await res.json();
      console.log(order);

      const options = {
        key,
        name: "Helpkey",
        currency: order.currency,
        amount: order.amount,
        order_id: order.id,
        description: "Understanding RazorPay Integration",
        handler: async function (response) {
          const verifyRes = await fetch("https://helpkey-backend.vercel.app//api/paymentverify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const result = await verifyRes.json();

          if (result?.message === "success") {
            if (typeof onSuccess === "function") {
              await onSuccess(response);
            } else {
              navigate(`/success?paymentid=${response.razorpay_payment_id}`);
            }
          } else {
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: "Helpkey",
          email: "helpkey@gmail.com",
          contact: "",
        },
      };

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded.");
        return;
      }

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on("payment.failed", function (response) {
        alert("Payment failed. Please try again.");
        console.error(response.error);
      });
    } catch (err) {
      console.error("Error during payment:", err);
      alert("Something went wrong. Please try again.");
    }
  };
};
