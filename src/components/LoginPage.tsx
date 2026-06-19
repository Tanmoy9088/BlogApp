// // import React from "react";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import * as yup from "yup";
// type RegistrationForm = {
//   name: string;
//   email: string;
//   phone: string;
//   gender: string;
//   password: string;
//   confirmPassword: string;
//   term: boolean | null;
// };
// const LoginPage = () => {
//   const navigation = useNavigate();

//   const registrationSchema = yup.object({
//     name: yup.string().required("name is required"),
//     email: yup
//       .string()
//       .required("email is required")
//       .email("Enter valid email"),
//     phone: yup.string().required("phone is required"),
//     gender: yup.string().required("gender is required"),

//     password: yup
//       .string()
//       .required("password is required")
//       .min(8, "password must be 8 character long"),
//     confirmPassword: yup
//       .string()
//       .required()
//       .oneOf([yup.ref("password")], "password do not match"),
//     term: yup.boolean().oneOf([true], "You must agree terms & condition"),
//   });
//   const {
//     register,
//     reset,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<RegistrationForm>({
//     resolver: yupResolver(registrationSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       term: null,
//     },
//   });

//   const onSubmit = (data) => {
//     console.log(data);
//     navigation("/home");
//     reset();
//   };
//   return (
//     <>
//       <div className="text-white flex justify-center items-center bg-black w-full h-screen">
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="flex flex-col text-white w-[350px] h-fit justify-center border p-2 rounded-xl"
//         >
//           <h2>Create an account</h2>
//           <div className="flex flex-col">
//             <label>Name</label>
//             <input
//               type="text"
//               {...register("name")}
//               placeholder="John Doe"
//               className="p-2 border rounded-xl text-black"
//             />
//             <p className="text-red-500">{errors.name?.message}</p>
//           </div>
//           <div className="flex flex-col">
//             <label>email</label>
//             <input
//               type="text"
//               {...register("email")}
//               placeholder="You@example.com"
//               className="p-2 border rounded-xl text-black"
//             />
//             <p className="text-red-500">{errors.email?.message}</p>
//           </div>
//           <div className="flex flex-col">
//             <label>phone</label>
//             <input
//               type="text"
//               {...register("phone")}
//               placeholder="+9190XXXX3456"
//               className="p-2 border rounded-xl text-black"
//             />
//             <p className="text-red-500">{errors.phone?.message}</p>
//           </div>

//           <div className="flex flex-col">
//             <label>gender</label>
//             <div>
//               <label className="p-2">
//                 <input
//                   type="radio"
//                   value={"Female"}
//                   {...register("gender")}
//                   className="p-2 border rounded-xl text-black mr-1"
//                 />
//                 Female
//               </label>
//               <label className="p-2">
//                 <input
//                   type="radio"
//                   value={"Male"}
//                   {...register("gender")}
//                   className="p-2 border rounded-xl text-black mr-1"
//                 />
//                 Male
//               </label>
//             </div>

//             <p className="text-red-500">{errors.gender?.message}</p>
//           </div>
//           <div className="flex flex-col">
//             <label>password</label>
//             <input
//               type="text"
//               {...register("password")}
//               placeholder="Enter password"
//               className="p-2 border rounded-xl text-black"
//             />
//             <p className="text-red-500">{errors.password?.message}</p>
//           </div>
//           <div className="flex flex-col">
//             <label>confirmPassword</label>
//             <input
//               type="password"
//               {...register("confirmPassword")}
//               placeholder="Re-enter password"
//               className="p-2 border rounded-xl text-black"
//             />
//             <p className="text-red-500">{errors.confirmPassword?.message}</p>
//           </div>
//           <div className="flex">
//             <input
//               type="checkbox"
//               {...register("term")}
//               className="p-2 border rounded-xl text-black"
//             />{" "}
//             <label>Terms & Conditons</label>
//             <p className="text-red-500">{errors.term?.message}</p>
//           </div>
//           <button
//             type="submit"
//             className="border bg-[#004e9b] w-full py-1 mt-4 rounded-xl uppercase"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default LoginPage;

// // const RegistrationPage = () => {

// //   });

// //   return <></>;
// // };

// // export default RegistrationPage;
