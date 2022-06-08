import React from "react";
import User from "../User/User";
import { UsersResponseType } from "../helper";
import Mouse from "../Mouse/Mouse";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

type FormState = {
  users: UsersResponseType[];
  user: UsersResponseType;
  value: number | null;
  loading: boolean;
  error: string | null;
};

class Form extends React.Component<any, FormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      users: [],
      value: null,
      loading: false,
      error: null,
      user: {} as UsersResponseType,
    };
    this.getUsers = this.getUsers.bind(this);
  }

  getUsers() {
    this.setState({ loading: true });

    fetch("https://jsonplaceholder.typicode.com/users")
      .then(async (response) => {
        if (response.ok) {
          return response.json() as Promise<UsersResponseType[]>;
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((res) => this.setState({ users: res || [] }))
      .catch((e) => {
        this.setState({ error: e.toString() });
      })
      .finally(() => this.setState({ loading: false }));
  }

  componentDidMount() {
    this.getUsers();
  }

  componentDidUpdate(
    prevProps: Readonly<any>,
    prevState: Readonly<FormState>,
    snapshot?: any
  ) {
    //Логика чисто ради ДЗ
    if (this.state.value !== prevState.value) {
      this.setState({
        user:
          this.state.users.find((i) => i.id === this.state.value) ||
          ({} as UsersResponseType),
      });
    }
  }

  render() {
    return (
      <>
        <p>
          Двигаем мышку: <Mouse />
        </p>
        <h1 data-testid="title">
          {this.state.value
            ? `Пользователь ${this.state.user.username}`
            : "Выберите пользователя"}
        </h1>
        {this.state.loading && <span data-testid="loading">Загрузка...</span>}
        {this.state.error && (
          <h4 style={{ color: "red" }} data-testid="error">
            {this.state.error}
          </h4>
        )}
        {!this.state.loading && !this.state.error && (
          <>
            <select
              onChange={(e) =>
                this.setState({ value: +e.currentTarget.value || null })
              }
              data-testid="select"
            >
              <option value=""></option>
              {this.state.users.map((i, index) => (
                <option value={i.id} key={i.name + index}>
                  {i.name}({i.username})
                </option>
              ))}
            </select>
            {!!this.state.value && (
              <ErrorBoundary>
                <User {...this.state.user} />
              </ErrorBoundary>
            )}
          </>
        )}
      </>
    );
  }
}

export default Form;
