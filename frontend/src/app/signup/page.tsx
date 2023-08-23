"use client";
import { Formik } from "formik";
import { AuthButton } from "../../components/buttons/AuthButton";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useRouter } from "next/navigation";
import { signUp } from "../../model/auth/authService";
import { User } from "shared";
import { isValidPhoneNumber } from "libphonenumber-js";
export default function SignUp() {
  const router = useRouter();
  return (
    <main className="w-full h-auto min-h-screen flex flex-col items-center justify-center px-5 py-24 gap-12">
      <h2 className={"font-rem text-5xl"}>Sign Up</h2>

      <Formik
        initialValues={{
          name: "",
          username: "",
          password: "",
          phone: "",
          confirm_password: "",
          gender: "",
          how_hear: "",
          how_hear_other: "",
          country: "",
          state: "",
          city: "",
        }}
        validate={(values) => {
          const errors: any = {};
          if (!values.name) {
            errors.name = "Required";
          }
          if (!values.username) {
            errors.username = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
          ) {
            errors.username = "Invalid email address";
          }

          if (!values.phone) {
            errors.phone = "Required";
          } else if (!isValidPhoneNumber(values.phone)) {
            errors.phone = "Invalid phone number";
          }
          if (!values.password) {
            errors.password = "Enter a password";
          }
          if (!values.confirm_password) {
            errors.confirm_password = "Reenter the password";
          }
          if (
            values.password !== values.confirm_password &&
            values.password &&
            values.confirm_password
          ) {
            errors.password = "Passwords don't match";
          }
          if (!values.gender) {
            errors.gender = "Please select an option";
          }
          if (!values.how_hear) {
            errors.how_hear = "Please select an option";
          }

          if (values.how_hear === "Other" && !values.how_hear_other) {
            errors.how_hear_other = "Please mention other source";
          }

          if (!values.country) {
            errors.country = "Please select a country";
          }

          if (!values.state) {
            errors.state = "Please select a state";
          }

          if (!values.city) {
            errors.city = "Please select a city";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setTimeout(async () => {
            await signUp(values as unknown as User);
            router.push("/login");
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
          setFieldValue,
          // @ts-ignore
          handleBlur,
          // @ts-ignore
          handleSubmit,
          // @ts-ignore
          isSubmitting,
        }) => (
          <form
            className={
              "w-full max-w-[480px]  flex flex-col gap-5 items-center justify-center"
            }
            onSubmit={handleSubmit}
            autoComplete={"off"}
          >
            <div className={"w-full flex flex-col items-center justify-center"}>
              <input
                className="rounded-full p-4 w-full font-rem text-xl text-black"
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
                className="rounded-full p-4 w-full font-rem text-xl text-black"
                type="email"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              {errors.username && touched.username && errors.username}
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
            <div className={"w-full flex flex-col items-center justify-center"}>
              <input
                className="rounded-full p-4 w-full font-rem text-xl text-black"
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
              <input
                className="rounded-full p-4 w-full font-rem text-xl text-black"
                type="phone"
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />
              {errors.phone && touched.phone && errors.phone}
            </div>
            <div className={"w-full flex flex-col items-center justify-center"}>
              <span className={"font-rem text-3xl"}>Gender</span>
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
              <span className={"font-rem text-3xl"}>
                How did you hear about us?
              </span>
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
                    className="rounded-full p-4 w-full font-rem text-xl text-black"
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
            <div
              className={
                "w-full flex flex-col gap-5 items-center justify-center"
              }
            >
              <ReactSearchAutocomplete
                fuseOptions={{ keys: ["name"] }} // Search on both fields
                resultStringKeyName="name" // String to display in the results
                onSelect={(item) => setFieldValue("country", item.name)}
                showIcon={false}
                items={[
                  { id: 0, name: "United States of America" },
                  { id: 1, name: "United Kingdom" },
                  { id: 2, name: "India" },
                ]}
                className={"w-full rounded-full w-full font-rem text-xl"}
                placeholder={"Country"}
                styling={{
                  zIndex: 8,
                }}
                showItemsOnFocus={true}
                showNoResults={true}
              />
              {errors.country}
              <ReactSearchAutocomplete
                fuseOptions={{ keys: ["name"] }} // Search on both fields
                resultStringKeyName="name" // String to display in the results
                onSelect={(item) => setFieldValue("state", item.name)}
                showIcon={false}
                items={[
                  { id: 0, name: "Gujarat" },
                  { id: 1, name: "Maharashtra" },
                ]}
                className={"w-full rounded-full w-full font-rem text-xl"}
                placeholder={"State"}
                styling={{
                  zIndex: 5,
                }}
                showItemsOnFocus={true}
                showNoResults={true}
              />
              {errors.state}

              <ReactSearchAutocomplete
                fuseOptions={{ keys: ["name"] }} // Search on both fields
                resultStringKeyName="name" // String to display in the results
                onSelect={(item) => setFieldValue("city", item.name)}
                showIcon={false}
                items={[
                  { id: 0, name: "Mumbai" },
                  { id: 1, name: "Pune" },
                  { id: 2, name: "Delhi" },
                ]}
                className={"w-full rounded-full  w-full font-rem text-xl"}
                placeholder={"City"}
                styling={{
                  zIndex: 2,
                }}
                showItemsOnFocus={true}
                showNoResults={true}
              />
              {errors.city}
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
