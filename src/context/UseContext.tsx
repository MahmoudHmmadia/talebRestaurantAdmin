import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
export const ERROR_MESSAGE = {
  type: "error",
  content: "The Server Is Not Working Write Now , Try Again Letter",
};
export type employee = {
  _id: string;
  name: string;
  role: number;
  salary?: number;
  age?: number;
  jobTitle?: string;
  image?: string;
  social?: social[];
};
type social = {
  address: string;
  name: string;
};
export type customer = {
  _id: string;
  name: string;
  email: string;
  phoneID: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};
interface Context {
  serverResponse: undefined | { content: string; type: string };
  setServerResponse: Dispatch<
    SetStateAction<
      | {
          content: string;
          type: string;
        }
      | undefined
    >
  >;
  customers: customer[] | undefined;
  setCustomers: Dispatch<SetStateAction<customer[] | undefined>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loader: boolean;
  setLoader: Dispatch<SetStateAction<boolean>>;
  auth: boolean;
  setAuth: Dispatch<SetStateAction<boolean>>;
}
const context = createContext<Context>({
  serverResponse: undefined,
  setServerResponse: () => {},
  customers: undefined,
  setCustomers: () => {},
  loading: false,
  setLoading: () => {},
  loader: false,
  setLoader: () => {},
  auth: false,
  setAuth: () => {},
});
export const Provider = ({ children }: { children: ReactNode }) => {
  const [serverResponse, setServerResponse] = useState<
    undefined | { content: string; type: string }
  >(undefined);
  const [customers, setCustomers] = useState<undefined | customer[]>();
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [auth, setAuth] = useState(false);
  return (
    <context.Provider
      value={{
        serverResponse,
        setServerResponse,
        customers,
        setCustomers,
        loading,
        setLoading,
        loader,
        setLoader,
        auth,
        setAuth,
      }}
    >
      {children}
    </context.Provider>
  );
};
const UseContext = () => useContext(context);
export default UseContext;
