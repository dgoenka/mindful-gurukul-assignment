"use client";
import { Formik } from "formik";
import { AuthButton } from "@/components/AuthButton";
export default function Home() {
  return (
    <div className="w-100 h-auto min-h-screen flex flex-col items-center justify-center p-24 gap-12">
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
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
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
            className={"flex flex-col gap-12 items-center justify-center"}
            onSubmit={handleSubmit}
          >
            <div className={"flex flex-col items-center justify-center"}>
              <input
                className="rounded-full p-2 w-4/5 font-rem text-3xl"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
            </div>
            <div className={"flex flex-col items-center justify-center"}>
              <input
                className="rounded-full p-2 w-4/5 font-rem text-3xl"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
            </div>
            <AuthButton type="submit" disabled={isSubmitting}>
              Submit
            </AuthButton>
          </form>
        )}
      </Formik>
    </div>
  );
}
