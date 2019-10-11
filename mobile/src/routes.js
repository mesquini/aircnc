import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import Login from './pages/Login'
import Booking from './pages/Booking'
import List from './pages/List'

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        List,
        Booking
    })
)

export default Routes