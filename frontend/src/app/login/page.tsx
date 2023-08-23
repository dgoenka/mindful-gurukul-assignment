"use client";
import { Formik } from "formik";
import { AuthButton } from "../../components/buttons/AuthButton";
import { useStore } from "effector-react";
import { authCredentials, login } from "../../model/auth/authService";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Login() {
  const router = useRouter();
  const authCredentialsUsage = useStore(authCredentials);

  return (
    <div className="w-full h-auto min-h-screen flex flex-col items-center justify-center p-24 gap-12">
      <h2 className={"font-rem text-5xl"}>Login</h2>

      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors: any = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(async () => {
            const res = await login({
              username: values.email,
              password: values.password,
            });
            setSubmitting(false);
            if (res) {
              await router.push("/dashboard");
            }
          }, 400);
        }}
      >
        {({
          // @ts-ignore
          values,
          // @ts-ignore
          errors,
          // @ts-ignore
          touched,
          // @ts-ignore
          handleChange,
          // @ts-ignore
          handleBlur,
          // @ts-ignore
          handleSubmit,
          // @ts-ignore
          isSubmitting,
        }) => (
          <form
            className={"w-3/5 flex flex-col gap-12 items-center justify-center"}
            onSubmit={handleSubmit}
          >
            <div className={"w-full flex flex-col items-center justify-center"}>
              <input
                className="rounded-full p-4 w-full font-rem text-xl text-black"
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
            </div>
            <div className={"w-full flex flex-col items-center justify-center"}>
              <input
                className="rounded-full p-4 w-full font-rem text-xl text-black"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
            </div>
            <AuthButton type="submit" disabled={isSubmitting}>
              Login
            </AuthButton>
          </form>
        )}
      </Formik>
    </div>
  );
}
