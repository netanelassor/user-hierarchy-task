import { Button, Card, Label, TextInput } from "flowbite-react";
import { LoginData } from "./login.types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { GENERAL, LOGIN } from "../../constants/locals/en-Us.constants";
import Logo from "../../assets/gong.svg";
import { useQuery } from "@tanstack/react-query";
import { logIn } from "./login.service";
import { isLoggedIn } from "../../utils/auth";

const demoLoginUser: LoginData = {
  password: "4XdnU2aZ",
  email: "brian.sornson@sorbrian.com",
};

export default function LoginForm(): JSX.Element {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginData>(demoLoginUser);
  const [loginFnTrigger, setLoginFnTrigger] = useState(false);

  const {
    data: loggedUser,
    isLoading,
  } = useQuery({
    queryKey: ["login"],
    queryFn: () => logIn(formData),
    enabled: loginFnTrigger,
  });

  function handleLogin(event: any) {
    event.preventDefault();
    //const loggedInUserId = await logIn(formData);
    setLoginFnTrigger(true);
  }

  if (loggedUser && isLoggedIn()) {
    console.log('loggedUser', loggedUser);
    setLoginFnTrigger(false);
    navigate("../");
  }

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
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
                disabled={!formData.email || !formData.password}>
                {LOGIN.LOGIN_BTN}
              </Button>
              {isLoading && (
                <Button
                  gradientDuoTone="purpleToBlue"
                  pill
                  disabled={true}
                  isProcessing
                >
                  {LOGIN.LOGIN_BTN}
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
