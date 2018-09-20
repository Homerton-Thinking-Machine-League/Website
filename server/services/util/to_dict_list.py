def row(row, transform={}):
    d = dict(row)
    for key in d:
        if key in transform:
            d[key] = transform[key](d[key])
    return d


def all(result, transform={}):
    return list(map(
        lambda r: row(r, transform=transform),
        list(result)
    ))
