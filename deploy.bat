docker tag ssinghnet/ai-playlist-api-gateway:latest 515964776068.dkr.ecr.us-east-1.amazonaws.com/ai-playlist/api-gateway:latest
docker tag ssinghnet/ai-playlist-llm-service:latest 515964776068.dkr.ecr.us-east-1.amazonaws.com/ai-playlist/llm-service:latest
docker tag ssinghnet/ai-playlist-spotify-service:latest 515964776068.dkr.ecr.us-east-1.amazonaws.com/ai-playlist/spotify-service:latest
docker tag ssinghnet/ai-playlist-service-registry:latest 515964776068.dkr.ecr.us-east-1.amazonaws.com/ai-playlist/service-registry:latest

docker push 515964776068.dkr.ecr.us-east-1.amazonaws.com/ai-playlist/api-gateway:latest
docker push 515964776068.dkr.ecr.us-east-1.amazonaws.com/ai-playlist/llm-service:latest
docker push 515964776068.dkr.ecr.us-east-1.amazonaws.com/ai-playlist/service-registry:latest
docker push 515964776068.dkr.ecr.us-east-1.amazonaws.com/ai-playlist/spotify-service:latest