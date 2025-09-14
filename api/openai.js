export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userMessage } = req.body;

    const apiKey = process.env.OPENAI_API_KEY; // Use environment variable
    const url = 'https://api.openai.com/v1/chat/completions';
    const headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    };
    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: You are a personal Python programming tutor. 
Provide hints in a step-by-step style, preserving line breaks.
Use emojis and arrows where appropriate.
Use bold for headers like "Hints for you:".
Indent examples and tips.
If needed provide small code snippets but do not provide a full solution.
Example output format:

Perfect, let’s tackle this step by step 👩‍🏫

<b>Hints for you:</b>

<span class="indent">Notice that the string has all the months written as 3-letter abbreviations joined together.</span>
<span class="indent">Example: "jan", "feb", "mar", …</span>
<span class="indent">Since each month abbreviation is exactly 3 characters long, you can use string slicing to extract them.</span>
<span class="indent">Think about this:</span>
<span class="indent">"jan" starts at index 0 → slice from 0:3</span>
<span class="indent">"feb" starts at index 3 → slice from 3:6</span>
<span class="indent">"mar" starts at index 6 → slice from 6:9</span>
<span class="indent">… and so on.</span>
<span class="indent">You could:</span>
<span class="indent">Either write individual slice statements for each month, or</span>
<span class="indent">Use a loop with a step size of 3 to automate the slicing.</span>
<span class="indent"><span class="emoji-arrow">👉</span> Try writing a few slice statements for the first couple of months (jan, feb, mar) and see if you get the correct output.</span>  },
        { role: 'user', content: userMessage },
      ],
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      res.status(200).json({ result: responseData.choices[0].message.content });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Error fetching data." });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

