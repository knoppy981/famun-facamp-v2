import React from "react";

export function useShowLoadingSpinner(isLoading: boolean) {
  const [nextButtonClicked, setNextButtonClicked] = React.useState(false)

  React.useEffect(() => {
    if (!isLoading) setNextButtonClicked(false)
  }, [isLoading])

  const setButtonClicked = () => {
    setNextButtonClicked(true)
  }

  return { show: isLoading && nextButtonClicked, setButtonClicked }
}