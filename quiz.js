(function(){

	 var app = angular.module('myQuiz', []); //

	 app.controller('QuizController',['$scope','$http','$sce', function($scope,$http,$sce){

	 	$scope.score=0;
	 	$scope.activeQuestion=-1;
	 	$scope.activeQuestionAnswered=0;
	 	$scope.percentage=0;

	 	$http.get('quiz_data.json').then(function(quizData)
	 	{
	 		$scope.myQuestions=quizData.data;
	 		$scope.totalQuestions = $scope.myQuestions.length;
	 	});

	 	$scope.SelectAnswer= function(qIndex,aIndex) // Parent index and index
	 	{
	 		var questionState = $scope.myQuestions[qIndex].questionState;

	 		if(questionState != 'answered')
	 		{
	 			$scope.myQuestions[qIndex].selectedAnswer = aIndex;
	 			var correctAnswer = $scope.myQuestions[qIndex].correct;


	 			//$scope.myQuestions[qIndex].correctAnswer = correctAnswer;

	 			//now we're gonna check if the user has picked the right answer
	 			if( aIndex === correctAnswer)
	 			{
	 				$scope.myQuestions[qIndex].correctness = 'correct';
	 				$scope.score +=1;
	 			}

	 			else
	 			{
	 				$scope.myQuestions[qIndex].correctness = 'incorrect';
	 			}


	 			$scope.myQuestions[qIndex].questionState = 'answered';
	 		} 

	 		$scope.percentage = (($scope.score / $scope.totalQuestions) * 100).toFixed(2); // toFix(2) displays two decimel numbers 0,00
	 	}


	 	$scope.isSelected = function(qIndex,aIndex)
	 	{
	 		return $scope.myQuestions[qIndex].selectedAnswer === aIndex;
	 	}

	 	$scope.isCorrect = function(qIndex,aIndex)
	 	{
	 		return $scope.myQuestions[qIndex].correctAnswer === aIndex;
	 	}

	 	$scope.selectContinue = function()
	 	{
	 		return $scope.activeQuestion +=1;
	 	}

	 	$scope.CreateShareLinks=function(percentage)
	 	{
	 		var url = 'http//codeifydesign.com';
	 		var emailLink = '<a class ="btn email" href = "mailto:?subject=try to beat my quiz score !&amp; body=I Scored a '+percentage+'% on the Quiz about Saturn. Try to beat my Score at '+url+'"> Email a Friend</a>';
	 		
	 		var twitterLink = '<a class ="btn twitter" target="_blank" href = "http://twitter/share?text=I Scored a '+percentage+' on the Quiz about Saturn. Try to beat my Score at&amp;&hashtags=SaturnQuiz&url='+url+'"> Tweet Your Score</a>';
	 		var newMarkUp = emailLink + twitterLink;

	 		return $sce.trustAsHtml(newMarkUp);
	 	}

	}]);

})();

//app.controller('QuizController',['$scope','$http','$sce' ,function($scope,$http,$sce) is used to
//assign controller to the app - appending a controler object to the app variable in first line
//scope is used to exchange data between JSON and HTML
//$http allows to load external contents like external JSON file
//sce stands for Strict conceptual escaping which allows us inject HTML from JSON file directly into the HTML document
//The reason we defined those strings('$scope','$http','$sce') and then as actual variables, is in case you wanted to minify your JavaScript file
//if you minify an angular application and you don't specify the individual services are with string litterals,
//the minification process can rename these variables and your angular application won't work.