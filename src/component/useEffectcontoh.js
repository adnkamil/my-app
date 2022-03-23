import React, { useContext, createContext, useState } from 'react'
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from 'react-router-dom';
import '../App.css';

// ----------------------------------------------------------------------1
// function App() {
//   const [name, setName] = useState('adnan')
//   const [src, setSrc] = useState('https://www.themealdb.com/images/category/chicken.png')

//   useEffect(() => {
//     document.title = `Profile ${name}`
//     console.log("hai");
//   }, [name])

//   const handleChangeName = (e) => {
//     setName(e.target.value)
//   }

//   const handleChangeSrc = (e) => {
//     setSrc(e.target.value)
//   }
//   return (
//     <div className="App">
//       <input type="text"
//         onChange={handleChangeName}
//       />
//       <input type="text"
//         onChange={handleChangeSrc}
//         />
//       <h1>{name}</h1>
//       <img src={src} alt="gambar"/>
//     </div>
//   );
// }

// export default App;
// ----------------------------------------------------------------------1


// ----------------------------------------------------------------------2
// const themes = {
//   light: {
//     foreground: "#000000",
//     background: "#eeeeee"
//   },
//   dark: {
//     foreground: "#ffffff",
//     background: "#222222"
//   }
// };

// const ThemeContext = createContext(null);

// function Latihan() {
//   return (
//     <ThemeContext.Provider value={themes.dark}>
//       <Toolbar />
//     </ThemeContext.Provider>
//   );
// }

// function Toolbar(props) {
//   return (
//     <div>
//       <ThemedButton />
//     </div>
//   );
// }

// function ThemedButton() {
//   const theme = useContext(ThemeContext);
//   console.log(theme);
//   return (
//     <button style={{ background: theme.background, color: theme.foreground }}>
//       I am styled by theme context!
//     </button>
//   );
// }

// export default Latihan

// ----------------------------------------------------------------------2


// ----------------------------------------------------------------------3

const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signout(callback) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },

};

export default function App() {
  return (
    <AuthProvider>
      <h1>Auth Example</h1>

      <p>
        This example demonstrates a simple login flow with three pages: a public
        page, a protected page, and a login page. In order to see the protected
        page, you must first login. Pretty standard stuff.
      </p>

      <p>
        First, visit the public page. Then, visit the protected page. You're not
        yet logged in, so you are redirected to the login page. After you login,
        you are redirected back to the protected page.
      </p>

      <p>
        Notice the URL change each time. If you click the back button at this
        point, would you expect to go back to the login page? No! You're already
        logged in. Try it out, and you'll see you go back to the page you
        visited just *before* logging in, the public page.
      </p>

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PublicPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/protected"
            element={
              <RequireAuth>
                <ProtectedPage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

function Layout() {
  return (
    <div>
      <AuthStatus />

      <ul>
        <li>
          <Link to="/latihan">Public Page</Link>
        </li>
        <li>
          <Link to="/latihan/protected">Protected Page</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}

let AuthContext = createContext(null);

let useAuth = () => {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  let [user, setUser] = useState(null);

  let signin = (newUser, callback) => {
    // console.log('masuk auth prov ', newUser);
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };
  // console.log(value, 'ini value dari AuthProvider');
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.user}!{' '}
      <button
        onClick={() => {
          auth.signout(() => navigate('/'));
        }}
      >
        Sign out
      </button>
    </p>
  );
}

function RequireAuth({ children }) {
  let auth = useAuth();
  // console.log(auth, ' ini isi auth');
  let location = useLocation();
  // console.log(location, 'ini locati requireauth');
  if (!auth.user) {
    // console.log(auth.user, 'ini current user');
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/latihan/login" state={{ from: location }} replace />;
  }

  return children;
}

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  // console.log(location, 'ini locati loginpage');
  let from = location.state?.from?.pathname || '/';
  
  function handleSubmit(event) {
    event.preventDefault();
    // console.log('masuk handle submit');
    let formData = new FormData(event.currentTarget);
    let username = formData.get('username');
    
    auth.signin(username, () => {
      // console.log('harusnya navigate ke protexted');
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true }); 
    });
  }

  return (
    <div>
      <p>You must log in to view the page at {from}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" />
        </label>{' '}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}

// ----------------------------------------------------------------------3