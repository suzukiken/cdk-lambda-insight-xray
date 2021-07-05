+++
title = "Lambda InsightsとX-Ray"
date = "2021-04-27"
tags = ["Lambda", "Lambda Insights", "X-Ray"]
+++

AWSコンソールのCloudWatchの画面に「Lambda Insights」というのがあるけどなんだろうと思って調べてみると、LambdaのモニタリングをCloudWatch側で確認できるようになるので、例えばAlarmの設定ができたりするなど便利そうだったのでコードを書いてみた。

書いてみたとか言ってるけど、少し前に自分が作った時にはドキュメントが無かった気がするけど、ともかく[AWSのドキュメント](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Lambda-Insights-Getting-Started-clouddevelopmentkit.html)に書いてある通りにコードを書けば良いだけだ。

仕組みとしてはAWSが用意したLambda Layerを使うことになる。これはリージョンによって異なる。あと権限はCloudWatchLambdaInsightsExecutionRolePolicyというのが用意されているのでそれを設定する。

Lambda Insightsはそんな風に若干コードを書く必要があるが、X-Rayの方はFunctionを作るときに`tracing: lambda.Tracing.ACTIVE`と書くだけ。

[Githubのリポジトリ](https://github.com/suzukiken/cdksns-filter)
