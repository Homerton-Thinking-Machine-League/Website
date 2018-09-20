def row(row, stringify=[]):
    d = dict(row)
    for key in stringify:
        d[key] = str(d[key])
    return d


def all(result, stringify=[]):
    return list(map(lambda r: row(r, stringify=stringify), list(result)))
