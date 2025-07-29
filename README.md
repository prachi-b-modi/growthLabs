# GrowthLabs

🏆 **Winner of Best Use of Mixpanel Award at the [Agent-to-Agent Hackathon](https://a2a-agents-hackathon.devpost.com/?ref_content=default&ref_feature=challenge&ref_medium=portfolio&_gl=1*fcrmas*_gcl_au*NDIzNzgxNzc5LjE3NTE0NDcxOTU.*_ga*MTk1NzMzNjY3MS4xNzQwNTQxMDc2*_ga_0YHJK3Y10M*czE3NTM3MTQyNDIkbzM5JGcxJHQxNzUzNzE0MzY5JGo3JGwwJGgw)**


<img width="1429" height="790" alt="Pasted Graphic 1" src="https://github.com/user-attachments/assets/3a2fb7bb-f720-4800-9c0f-03f1b6a3d6b2" />


## Overview

GrowthLabs is an intelligent platform that automatically detects drops in user engagement and provides data-driven recommendations for recovery through A/B testing. The platform creates a complete feedback loop from detection to implementation, leveraging multiple AI and ambient agents and APIs for comprehensive growth optimization.

## How It Works

### 🔍 **Engagement Detection**
- Monitors user engagement metrics using **Mixpanel** and **Arcade.dev**
- Automatically detects significant drops in user activity and engagement patterns
- Triggers alerts when engagement falls below predefined thresholds

### 🌐 **Web Intelligence Gathering**
- Scrapes relevant web insights using **Bright Data's Reddit Discovery API**
- Collects real-time user sentiment and feedback from social platforms
- Gathers competitive intelligence and market trends

### 📊 **Sentiment Analysis**
- Processes collected data through **Senso API** for advanced sentiment analysis
- Identifies key pain points and user satisfaction trends
- Provides actionable insights from user feedback

### 🧪 **A/B Experiment Design**
- Leverages **LLM-powered experiment designer** to generate hypothesis-driven A/B tests
- Creates targeted experiments based on detected engagement drops
- Optimizes test parameters for maximum impact

### 🔄 **Human-in-the-Loop Validation**
- Integrates human validation for experiment approval and refinement
- Ensures quality control and business alignment
- Maintains oversight while automating routine tasks

### 🚀 **Automated Implementation**
- **Slack integration** for team notifications and experiment updates
- **Jira integration** for seamless project management and task tracking
- Automated deployment of approved experiments

## Architecture

The platform consists of multiple specialized AI agents:


- **Bright Data Agent**: Handles web scraping and data collection
- **Senso AI Agent**: Performs sentiment analysis and user feedback processing
- **Arcade Agent**: Monitors and analyzes user engagement metrics
- **LLM Agent**: Generates and optimizes A/B test hypotheses
- **Ambient Agent**: Provides continuous monitoring and automated decision making
- **Orchestrator**: Coordinates all agents and manages the overall workflow

## Technology Stack

- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Backend**: Python with multiple AI agents
- **Analytics**: Mixpanel for user engagement tracking
- **Data Collection**: Bright Data APIs for web scraping
- **Sentiment Analysis**: Senso API
- **Integration**: Slack and Jira APIs
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js and pnpm
- Python 3.8+
- Mixpanel account
- Bright Data API access
- Senso API credentials

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd growthLabs
```

2. Install frontend dependencies:
```bash
pnpm install
```

3. Set up backend environment:
```bash
cd backend
pip install -r requirements.txt
```

4. Configure environment variables for all API integrations

5. Start the development server:
```bash
pnpm dev
```

## Contributing

This project was built for the Agent-to-Agent Hackathon. For contributions or questions, please reach out to the development team.

## License

This project is licensed under the MIT License.

---

*Built with ❤️ for the Agent-to-Agent Hackathon community*
