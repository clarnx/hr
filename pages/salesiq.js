import React from 'react';

export default class Salesiq extends React.Component{
    constructor(props) {
        super(props);
        this.hasCode = props.hasOwnProperty('widgetCode');
    }

    render() {
        return (
            this.hasCode ? <script type="text/javascript"  dangerouslySetInnerHTML={{
                    __html: `
                    var $zoho=$zoho || {};$zoho.salesiq = $zoho.salesiq || {widgetcode:"${this.props.widgetCode}", values:{},ready:function(){}};var d=document;s=d.createElement("script");s.type="text/javascript";s.id="zsiqscript";s.defer=true;s.src="${this.props.domain}";t=d.getElementsByTagName("script")[0];t.parentNode.insertBefore(s,t);
                        `
                }}>
            </script> : <div style={{color: 'red'}}>Need to pass widget code</div>
        );
    }
}
