import qs from 'qs'

export default client => ({
  list (filters) {
    let statuses = []
    if (filters.status.published) {
      statuses.push('PUB')
    }
    if (filters.status.pending) {
      statuses.push('PEN')
    }
    if (filters.status.invalid) {
      statuses.push('INV')
    }

    let severities = []
    if (filters.severity.low) {
      severities.push(1)
    }
    if (filters.severity.medium) {
      severities.push(2)
    }
    if (filters.severity.high) {
      severities.push(3)
    }
    if (filters.severity.dangerous) {
      severities.push(4)
    }

    return client
      .get('pois/', {
        params: {
          status__in: statuses.join(),
          severity__in: severities.join()
        },
        paramsSerializer: (params) => qs.stringify(params, { indices: false })
      })
      .then(response => response.data.results)
  },
  get (id) {
    return client
      .get(`pois/${id}/`)
      .then(response => response.data)
  },
  addVote (poiId, vote) {
    return client
      .post('ratings/', {
        poi: poiId,
        vote: vote
      })
      .then(response => response.data)
  },
  addComent (poiId, comment) {
    return client
      .post('comments/', {
        poi: poiId,
        comment: comment
      })
      .then(response => response.data)
  },
  addChangeRequest (poiId, change) {
    return client
      .post('changerequests/', {
        poi: poiId,
        change: change
      })
      .then(response => response.data)
  }
})
