<script lang="ts">
    // Define dynamic variables
    export let websiteName: string = "Peak-Fortune Gaming";
    export let websiteUrl: string = "https://peak-fortune.pages.dev";
    export let contactEmail: string = "waves.tagent@gmail.com";
</script>

<div>
    <h1>Privacy Policy</h1>

    <p>
        This Privacy Policy describes how {websiteName} ("we," "us," or "our") collects,
        uses, and discloses information, including personal information, obtained
        through our website (<a href={websiteUrl}>{websiteUrl}</a>).
    </p>

    <h3>Information We Collect</h3>

    <p>
        We do not collect any personal information from visitors to our website.
        However, we may collect non-personal information automatically as
        visitors navigate through the site. This may include usage details, IP
        addresses, and information collected through cookies and other tracking
        technologies. We use this information to improve our website and enhance
        the user experience.
    </p>

    <h3>Third-Party Advertisers</h3>

    <p>
        We use third-party advertising companies, such as Google AdSense, to
        serve ads when you visit our website. These companies may use cookies or
        other tracking technologies to collect information about your visits to
        this and other websites in order to provide advertisements about goods
        and services of interest to you. This information does not include
        personal information such as your name, address, email address, or
        telephone number. However, it may include demographic information or
        interest categories associated with your browser or device.
    </p>

    <h3>Opting Out of Ad Personalization</h3>

    <p>
        You can opt out of personalized advertising by visiting Google's Ads
        Settings page (<a href="https://adssettings.google.com"
            >https://adssettings.google.com</a
        >) or by using the Network Advertising Initiative's opt-out page (<a
            href="http://optout.networkadvertising.org"
            >http://optout.networkadvertising.org</a
        >).
    </p>

    <h3>Changes to This Privacy Policy</h3>

    <p>
        We may update this Privacy Policy from time to time. We encourage you to
        review this page periodically for any changes. Your continued use of our
        website after any changes to this Privacy Policy will constitute your
        acceptance of such changes.
    </p>

    <h3>Contact Us</h3>

    <p>
        If you have any questions about this Privacy Policy, please contact us
        at <a href={"mailto:" + contactEmail}>{contactEmail}</a>.
    </p>

    <p>
        This Privacy Policy was last updated on {new Date().toLocaleDateString()}.
    </p>
</div>

<style>
    h1 {
        text-align: center;
    }

    a {
        color: #45a0eb
    }
</style>
