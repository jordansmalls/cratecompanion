import { SpinnerButton } from "./SpinnerButton";


const ResetAccountButton = ({ loading, className, loadingText, variant }) => {
    return (
        <>
            <SpinnerButton variant={variant} className={className} isLoading={loading} loadingText={loadingText} >
                Reset Account
            </SpinnerButton>
        </>
    )
}

export default ResetAccountButton