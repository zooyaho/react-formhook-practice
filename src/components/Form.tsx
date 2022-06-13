import React from "react";
import { useForm } from "react-hook-form";

/*
const ToDoList = () => {
  const [toDo, setToDo] = useState("");
  const [toDoError, setToDoError] = useState("");
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
        <input value={toDo} onChange={changeHadler} placeholder="Write a to do" />
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
  extraError?: string;
}

const ToDoList = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError // 특정한 에러를 발생시킴.
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: IForm) => {
    // 이 함수는 react-hook-form이 모든 validation을 다 마쳤을때만 호출 됨.
    if (data.password !== data.password1) {
      setError("password1", { message: "Password are not the same" }, { shouldFocus: true });
    }
    // 전체 폼에 대한 에러, ex) 누군가 서버를 해킹해서, 서버가 다운되어 접속이 끊길경우
    // setError("extraError", { message: "Server Offline." });
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
        <span>{errors?.email?.message}</span>
        <input
          {...register("firstName", {
            required: "write here", validate: {
              noMark: (value) => value.includes("mark") ? "no mark allowed" : true,
              noLee: (value) => value.includes("lee") ? "no mark allowed" : true
            }
          })}
          placeholder="First Name"
        />
        <span>{errors?.firstName?.message}</span>
        <input
          {...register("lastName", { required: "write here" })}
          placeholder="Last Name"
        />
        <span>{errors?.lastName?.message}</span>
        <input
          {...register("username", {
            required: "write here", minLength: {
              value: 6,
              message: "Your user name is too short.",
            }
          })}
          placeholder="Username"
        />
        <span>{errors?.username?.message}</span>
        <input
          {...register("password", {
            required: "write here", minLength: {
              value: 5,
              message: "Your password is too short.",
            },
          })}
          placeholder="Password"
        />
        <span>{errors?.password?.message}</span>
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
        <span>{errors?.password1?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
};
export default ToDoList;