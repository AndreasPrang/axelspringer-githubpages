import React, { Component } from 'react';

import GitHubStats from '../GitHubStats/GitHubStats';
import GitHubService from '../../services/GitHubService';

import './ProjectTile.scss';

var FaPlayCircle = require('react-icons/lib/fa/play-circle');
import TrackerService from '../../services/TrackingService'

export default class ProjectTile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stats: {}
        };
    }

    componentWillMount() {
        GitHubService.getStats(this.props.projectData.ownerId, this.props.projectData.projectId).then((stats) => {
            let state = this.state;
            state.stats = stats;
            this.setState(state);
        });
    }

    openVideo() {
        console.log('Track: openVideo');
        TrackerService.trackEvent('Projects', 'openVideo', this.props.projectData.videoUrl);

        window.open(this.props.projectData.videoUrl, '_blank');
    }

    goToRepo() {
        console.log('Track: goToRepo');
        TrackerService.trackEvent('Projects', 'goToRepo', this.state.stats.name);
    }

    render() {
        return (
            <div className='projectTile__container'>
                <h3 className='projectTile__heading'>
                    <a href={this.state.stats.html_url}>{this.props.projectData.title}</a>
                    <img className='projectTile__logo' src={this.state.stats.owner ? this.state.stats.owner.avatar_url : ''} />
                </h3>
                <p className='projectTile__description'>{this.props.projectData.description}</p>
                <button className='projectTile__videoButton' onClick={this.openVideo.bind(this)}><FaPlayCircle /> Erklärvideo</button>
                <GitHubStats stats={this.state.stats} />
            </div>
        );
    }
}