import { ActivityIndicator, ActivityIndicatorProps } from 'react-native'

interface LoaderProps {
    size?: ActivityIndicatorProps['size']
}

const Loader = ({ size = 'small' }: LoaderProps) => <ActivityIndicator size={size} />

export default Loader
