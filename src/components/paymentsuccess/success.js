import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const Success = () => {
  const [searchParams] = useSearchParams();
  const paymentid = searchParams.get('paymentid');
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center mt-[100px]">
      <div
        className="bg-green-100 border border-green-400 w-1/2 text-green-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Payment successful!</strong>
        <span className="block sm:inline">
          Your paymentID = {paymentid} has been processed.
        </span>

        <div className="mt-4">
          <button
            onClick={handleRedirect}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
