import React from "react";
import { useForm } from "react-hook-form";

/*
const ToDoList = () => {
  const [value, setValue] = useState("");
  const [toDo, setToDo] = useState("");
  const changeHadler = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDoError("");
    setToDo(value);
  };
  const submitHandler = (event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    if (toDo.length < 10) {
      return setToDoError("To do should be longer");
    }
    console.log("submit");
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input value={value} onChange={changeHadler} placeholder="Write a to do" />
        <button>Add</button>
        {toDoError !== "" ? toDoError : null}
      </form>
    </div>
  );
};
*/

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
}

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: any) => {
    // 이 함수는 react-hook-form이 모든 validation을 다 마쳤을때만 호출 됨.
    console.log(data);
  };
  console.log(errors);
  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column", marginTop: "100px" }} onSubmit={handleSubmit(onValid)}>
      <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="Email"
        />
        <span style={{color:"tomato"}}>{errors?.email?.message}</span>
        <input
          {...register("firstName", { required: "write here" })}
          placeholder="First Name"
        />
        <span style={{color:"tomato"}}>{errors?.firstName?.message}</span>
        <input
          {...register("lastName", { required: "write here" })}
          placeholder="Last Name"
        />
        <span style={{color:"tomato"}}>{errors?.lastName?.message}</span>
        <input
          {...register("username", { required: "write here", minLength: 10 })}
          placeholder="Username"
        />
        <span style={{color:"tomato"}}>{errors?.username?.message}</span>
        <input
          {...register("password", { required: "write here", minLength: 5 })}
          placeholder="Password"
        />
        <span style={{color:"tomato"}}>{errors?.password?.message}</span>
        <input
          {...register("password1", {
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Your password is too short.",
            },
          })}
          placeholder="Password1"
        />
        <span style={{color:"tomato"}}>{errors?.password1?.message}</span>
        <button>Add</button>
      </form>
    </div>
  );
};
export default Form;