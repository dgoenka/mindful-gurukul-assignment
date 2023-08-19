"use client";
import { Formik } from "formik";
import { AuthButton } from "@/components/AuthButton";
export default function Home() {
  return (
    <main className="w-100 h-auto min-h-screen flex flex-col items-center justify-center p-24 gap-12">
      <h2 className={"font-rem text-5xl"}>Sign Up</h2>

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
            className={"w-2/5 flex flex-col gap-5 items-center justify-center"}
            onSubmit={handleSubmit}
          >
            <div className={"w-full flex flex-col items-center justify-center"}>
              <input
                className="rounded-full p-4 w-full font-rem text-xl"
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {errors.name && touched.name && errors.name}
            </div>
            <div className={"w-full flex flex-col items-center justify-center"}>
              <input
                className="rounded-full p-4 w-full font-rem text-xl"
                type="email"
                name="email"
                placeholder="Username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
            </div>

            <div className={"w-full flex flex-col items-center justify-center"}>
              <input
                className="rounded-full p-4 w-full font-rem text-xl"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
            </div>
            <div className={"w-full flex flex-col items-center justify-center"}>
              <input
                className="rounded-full p-4 w-full font-rem text-xl"
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirm_password}
              />
              {errors.confirm_password &&
                touched.confirm_password &&
                errors.confirm_password}
            </div>
            <div className={"w-full flex flex-col items-center justify-center"}>
              <span className={"font-rem text-xl"}>Gender</span>
              <div
                className={
                  "flex flex-row items-center gap-2 justify-center font-rem text-xl"
                }
                onChange={handleChange}
              >
                <input
                  type="radio"
                  className={"font-rem text-xl"}
                  value="Male"
                  name="gender"
                />{" "}
                Male
                <input
                  type="radio"
                  className={"font-rem text-xl"}
                  value="Female"
                  name="gender"
                />{" "}
                Female
                <input
                  type="radio"
                  className={"font-rem text-xl"}
                  value="Other"
                  name="gender"
                />{" "}
                Other
              </div>
              {errors.gender}
            </div>
            <div
              className={
                "w-full flex flex-col items-center justify-center font-rem text-xl gap-3"
              }
            >
              <span>How did you hear about us?</span>
              <div
                className={"grid grid-cols-2 gap-3 items-center justify-center"}
                onChange={handleChange}
              >
                <div>
                  <input type="radio" value="LinkedIn" name="how_hear" />{" "}
                  LinkedIn
                </div>
                <div>
                  <input type="radio" value="Friends" name="how_hear" /> Friends
                </div>
                <div>
                  <input type="radio" value="Job Portal" name="how_hear" /> Job
                  Portal
                </div>
                <div>
                  <input type="radio" value="Other" name="how_hear" /> Others
                </div>
              </div>
              {errors.gender}
              {values.how_hear === "Other" && (
                <div
                  className={"w-full flex flex-col items-center justify-center"}
                >
                  <input
                    className="rounded-full p-4 w-full font-rem text-xl"
                    type="text"
                    name="how_hear_other"
                    placeholder="Mention Here"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.how_hear_other}
                  />
                  {errors.how_hear_other &&
                    touched.how_hear_other &&
                    errors.how_hear_other}
                </div>
              )}
            </div>
            <AuthButton type="submit" disabled={isSubmitting}>
              Save
            </AuthButton>
          </form>
        )}
      </Formik>
    </main>
  );
}
