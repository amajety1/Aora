import { View, Text, Image } from 'react-native'
import React from 'react'
import { Link, Tabs,Redirect } from 'expo-router';


import {icons} from "../../constants";

const TabIcon = ({icon, color, name, focused}) => {
  return (
    <View className='items-center justify-center min-w-[80px]'>
      <Image 
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className='w-6 h-6 '
        />
        <Text numberOfLines={1} className={` ${focused ? "font-psemibold" : 'font-pregular'} text-xs text-center`} style={{color:color, fontSize: 10}}>
          {name}
        </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
    <Tabs
      screenOptions={{ 
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#ffa001',
        tabBarInactiveTintColor: '#cdcde0',
        tabBarStyle: {
          backgroundColor: '#161622',
          borderTopWidth: 10,
          borderTopColor: '#232533',
          height: 84,
        },
      }}
      >
      <Tabs.Screen name="home" 
      options={{
        title: "Home",
        headerShown: false,
        tabBarIcon: ({color, focused}) => (
          <TabIcon icon={icons.home} color={color} name="Home" focused={focused} />
        )
      }}
      />
      <Tabs.Screen name="bookmark" 
      options={{
        title: "Bookmark",
        headerShown: false,
        tabBarIcon: ({color, focused}) => (
          <TabIcon icon={icons.bookmark} color={color} name="Bookmark" focused={focused} />
        )
      }}
      />
      <Tabs.Screen name="create" 
      options={{
        title: "Create",
        headerShown: false,
        tabBarIcon: ({color, focused}) => (
          <TabIcon icon={icons.plus} color={color} name="Create" focused={focused} />
        )
      }}/>
      <Tabs.Screen name="profile" 
      options={{
        title: "Profile",
        tabBarIcon: ({color, focused}) => (
          <TabIcon icon={icons.profile} color={color} name="Profile" focused={focused} />
        )
      }}/>
    </Tabs>
    </>
  )
}

export default TabsLayout