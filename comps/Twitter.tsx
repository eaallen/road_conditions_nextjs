import { Component, ReactNode } from "react";

export default class Twitter extends Component {

    anchor: HTMLAnchorElement | undefined = undefined

    componentDidMount(): void {
        this.anchor = document.createElement("a");
        this.anchor.setAttribute("class", "twitter-timeline");
        this.anchor.setAttribute("data-tweet-limit", "5");
        this.anchor.setAttribute("data-height", "300");
        this.anchor.setAttribute("data-chrome", "nofooter");
        this.anchor.setAttribute("href", "https://twitter.com/UDOTTRAFFIC");
        document.getElementsByClassName("twitter-embed")[0].appendChild(this.anchor);

        const script = document.createElement("script");
        script.setAttribute("src", "https://platform.twitter.com/widgets.js");
        document.getElementsByClassName("twitter-embed")[0].appendChild(script);
    }

    componentWillUnmount(): void {
        this.anchor?.remove()
    }

    render(): ReactNode {
        return (
            <section className="twitterContainer">
                <div className="twitter-embed"></div>
            </section>
        )
    }
}