import CircularProgress from '@mui/material/CircularProgress'

const LoadingQuiz = (): JSX.Element => (
	<div className="flex justify-center pt-14">
		<div className="text-center">
			<CircularProgress className="text-blue-500" />
			<h4 className="text-blue-500">загрузка...</h4>
		</div>
	</div>
)

export default LoadingQuiz
