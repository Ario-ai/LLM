docker build -t llm_gpu .
docker run -d --name llm_gpu_container -p 80:80 -e WEB_CONCURRENCY="1" llm_gpu
curl -v http://0.0.0.0/
curl -v http://0.0.0.0/checkgpu
