import { Button, Card, Label, TextInput } from "flowbite-react";
import { LoginData } from "./login.types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { GENERAL, LOGIN } from "../../constants/locals/en-Us.constants";
import Logo from "../../assets/gong.svg";
import { fetchLogin, loginActions } from "./login.service";
import { fetchUsers } from "../users-hierarchy/users-hierarchy.service";
import { queryClient } from "../../utils/query-client";

const getUsers = () => queryClient.fetchQuery({ queryKey: ["users"], queryFn: fetchUsers });
const setLogin = (data:LoginData) => queryClient.fetchQuery({
  queryKey: ["login"],
  queryFn: () => fetchLogin(data),
});

const demoLoginUser: LoginData = {
  password: "4XdnU2aZ",
  email: "brian.sornson@sorbrian.com",
};

export default function LoginForm(): JSX.Element {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginData>(demoLoginUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isWrongLogin, setIsWrongLogin] = useState<boolean>(false);



  async function handleLogin(event: any):Promise<void> {
    setIsWrongLogin(false);
    setIsLoading(true);
    event.preventDefault();
    try {
      const loggedUserId = await setLogin(formData);

      if (!loggedUserId) {
        setIsWrongLogin(true);
        setIsLoading(false);
        return;
      }

      const users = await getUsers();
      if (users && loggedUserId) {
        loginActions(users, loggedUserId);
        setIsLoading(false);
        navigate("../");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="h-screen w-screen">
      <div className="flex flex-col justify-center items-center gap-2 h-full">
        <a
          href="#"
          className="flex items-center justify-center mb-6 text-4xl font-bold"
        >
          <img src={Logo} alt={GENERAL.COMPANY_NAME} />
          <span>{GENERAL.COMPANY_NAME.toUpperCase()}</span>
        </a>

        <Card className="w-96">
          <h1 className="text-xl font-bold text-start">{LOGIN.TITLE}</h1>
          <form
            className="flex flex-col gap-4 p-4"
            id="login-form"
            onSubmit={handleLogin}
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col text-start w-full">
                <Label htmlFor="email" value={LOGIN.EMAIL} />
                <TextInput
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onInput={handleInputChange}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col text-start w-full">
                <Label htmlFor="password" value={LOGIN.PASSWORD} />
                <TextInput
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onInput={handleInputChange}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Button
                gradientDuoTone="purpleToBlue"
                pill
                type="submit"
                disabled={!formData.email || !formData.password || isLoading}
                isProcessing={isLoading}
              >
                {LOGIN.LOGIN_BTN}
              </Button>
            </div>
            {isWrongLogin && <div>{LOGIN.VALIDATION_FAILED}</div>}
          </form>
        </Card>
      </div>
    </div>
  );
}
