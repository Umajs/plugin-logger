enum LEVEL{
    ALL = -Infinity,
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3,
    NONE = Infinity
}

export default function getLevel(level: string): number {
    return LEVEL[level.toUpperCase()];
}
