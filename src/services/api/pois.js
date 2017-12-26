import qs from 'qs'

export default client => ({
  list (bbox, filters) {
    let statuses = []
    if (filters.statuses.published) {
      statuses.push('PUB')
    }
    if (filters.statuses.pending) {
      statuses.push('PEN')
    }
    if (filters.statuses.invalid) {
      statuses.push('INV')
    }

    let severities = []
    if (filters.severities.low) {
      severities.push(1)
    }
    if (filters.severities.medium) {
      severities.push(2)
    }
    if (filters.severities.high) {
      severities.push(3)
    }
    if (filters.severities.dangerous) {
      severities.push(4)
    }
    return client
      .get('pois/', {
        params: {
          in_bbox: bbox,
          status__in: statuses.join(),
          severity__in: severities.join(),
          tags__name__in: filters.tags.join()
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
