import { View, Text, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import { useState } from 'react'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { Alert } from 'react-native'
import { router } from 'expo-router';
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
    const [form, setform] = useState({
        email: '',
        password: ''
    })
    const [isSubmmiting, setIsSubmmiting] = useState(false)
    const { setUser, setIsLoggedIn } = useGlobalContext();

    const submit = async () => {
        if(!form.email || !form.password) {
            Alert.alert('Error', 'Please fill in all fields')
            return
        }

        setIsSubmmiting(true)

        try {
            await signIn(form.email, form.password)
            const result = await getCurrentUser()
            setUser(result)
            setIsLoggedIn(true)

            Alert.alert('Success', 'You have successfully signed in')
            router.replace('/home')
        } catch (error) {
            Alert.alert('Error', error.message)
        } finally {
            setIsSubmmiting(false)
        }
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{height: '100%'}}>
                <View className="w-full h-full justify-center px-4 pb-20">
                    <Image
                        source={images.logo}
                        resizeMode='contain'
                        className="w-[115px] h-[35px]"
                    />
                    <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Sign in to Aora</Text>
                    <FormField
                        title='Email'
                        value={form.email}
                        handleChangeText={(e) => setform({...form, email: e})}
                        otherStyles="mt-7"
                        keyboardType='email-address'
                    />
                    <FormField
                        title='Password'
                        value={form.password}
                        handleChangeText={(e) => setform({...form, password: e})}
                        otherStyles="mt-7"
                    />
                    <CustomButton
                        title="Sign In"
                        handlePress={submit}
                        containerStyles="mt-7"
                        isLoading={isSubmmiting}
                    />
                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">Don't have an account?</Text>
                        <Link href="/sign-up" className='text-lg font-psemibold text-secondary'>Sing Up</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn