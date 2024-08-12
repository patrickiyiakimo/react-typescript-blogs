import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";

type LoginFormValues = {
  email: string;
  password: string;
};

type LoginFormProps = {
  text: string;
};

export default function LoginForm({ text }: LoginFormProps) {
  const initialValues: LoginFormValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values: LoginFormValues) => {
    console.log("Form values:", values);
    try {
      const response = await fetch(
        "https://blogtest.courierplus-ng.site/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Get more details about the error
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorData.message}`
        );
      }

      const logInData = await response.json();
      console.log("LogIn successful:", logInData);

      // Assuming the token is returned in logInData.token
      if (logInData.token) {
        localStorage.setItem("blog-api-token", logInData.token);
      } else {
        throw new Error("Token not found in response");
      }
    } catch (error) {
      console.log("LogIn failed:", (error as Error).message);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <FormikForm>
            <legend className="pb-5 font-semibold text-2xl text-center">
              {text}
            </legend>
            <div className="ml-6 md:ml-10">
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="w-72 md:w-96 h-12 mt-7 pl-2 border-2 border-black"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="block w-72 md:w-96 mt-7 h-12 pl-2 border-2 border-black"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
            </div>
            <button
              type="submit"
              className="whitespace-nowrap ml-8 md:ml-12 mt-7 px-28 md:px-40 py-3 bg-green-500 hover:bg-green-600 text-white rounded-md"
            >
              Log In
            </button>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
}
