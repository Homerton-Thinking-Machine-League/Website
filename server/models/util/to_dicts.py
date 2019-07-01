def _row(row, transform={}):
    d = dict(row)
    for key in d:
        if key in transform:
            d[key] = transform[key](d[key])
    return d


def one(result, transform={}):
    result_list = list(result)
    if len(result_list) != 1:
        raise Exception('More than 1 result found')
    return _row(result_list[0], transform=transform)


def all(result, transform={}):
    return list(map(
        lambda r: _row(r, transform=transform),
        list(result)
    ))
