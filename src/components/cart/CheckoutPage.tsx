export function CheckoutPage() {
    const params = new URLSearchParams(window.location.search);
    const serviceId = params.get("serviceId");
    const price = params.get("price");
  
    return (
      <div>
        <h1>Checkout</h1>
        <p>Service ID: {serviceId}</p>
        <p>Price: ${price}</p>
      </div>
    );
  }