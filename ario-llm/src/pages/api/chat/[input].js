export default function handler(req, res) {
    const { input } = req.query;
    console.log(input)
    res.end(`Post: ${input}`);
  }