import { createAppContainer, createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation'

import ExampleScreen from 'App/Containers/Example/ExampleScreen'
import SplashScreen from 'App/Containers/SplashScreen/SplashScreen'
import SignInScreen from 'App/Containers/Authentication/SignInScreen'
import SignOutScreen from 'App/Containers/Authentication/SignOutScreen'
import AuthLoadingScreen from 'App/Containers/Authentication/AuthLoadingScreen'
import ProductsScreen from 'App/Containers/Product/ProductsScreen'
/**
 * The root screen contains the application's navigation.
 *
 * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
 */
const StackNavigator = createStackNavigator(
  {
    // Create the application routes here (the key is the route name, the value is the target screen)
    // See https://reactnavigation.org/docs/en/stack-navigator.html#routeconfigs
    SplashScreen: SplashScreen,
    // The main application screen is our "ExampleScreen". Feel free to replace it with your
    // own screen and remove the example.
    MainScreen: ExampleScreen,
  },
  {
    // By default the application will show the splash screen
    initialRouteName: 'MainScreen',
    // See https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
    headerMode: 'none',
  }
)

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: StackNavigator,
  },
  Notifications: {
    screen: ExampleScreen,
  },
  Products :{
    screen: ProductsScreen,
  },
  Exit: {
    screen: SignOutScreen,
  }
},
{

  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle'
});

const AppStack = createStackNavigator({ Home: MyDrawerNavigator, Other: ExampleScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen }, { headerMode: 'none' });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: MyDrawerNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
))
