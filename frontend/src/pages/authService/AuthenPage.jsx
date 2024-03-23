import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
const AuthenPage = () => {
  const { id, uniqueString } = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/auth/verify/${id}/${uniqueString}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  return (
    <section className="flex items-center p-8 dark:bg-gray-900 dark:text-gray-100">
      {data && <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md container flex flex-col items-center justify-center mx-auto my-8 text-center">
          {data?.status === "Success" ? (
            <>
              <FaCheckCircle color="green" size={200} className="mx-100" />
              <p className="text-2xl font-semibold md:text-3xl">
                Your account is verified
              </p>
              <p className="mt-4 mb-8 dark:text-gray-400">
                Your account has been confirmed. Please log in and use our
                services.
              </p>
            </>
          ) : (
            <>
              <MdError color="red" size={200} className="mx-100" />
              <p className="text-2xl font-semibold md:text-3xl">
                Your account is not verified
              </p>
              <p className="mt-4 mb-8 dark:text-gray-400">
                {data?.message}
              </p>
            </>
          )}
          <Link
            to="/"
            rel="noopener noreferrer"
            href="#"
            className="px-8 py-3 my-2  font-semibold rounded bg-gray-200 text-gray-900"
          >
            Back to homepage
          </Link>

        </div>
      </div>}

    </section>
  );
};
export default AuthenPage;
