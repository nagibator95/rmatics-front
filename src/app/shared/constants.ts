interface ILanguageMode {
    name: string;
    version?: number;
}

export interface ILanguage {
    id: number;
    title: string;
    mode: string | ILanguageMode;
    code?: number;
}

export const languages: ILanguage[] = [
    {
        id: 1,
        title: 'Free Pascal 3.0.2',
        mode: 'text/x-pascal',
    },
    {
        id: 2,
        title: 'GNU C 7.2.0',
        mode: 'text/x-csrc',
    },
    {
        id: 3,
        title: 'GNU C++ 7.2.0',
        mode: 'text/x-c++src',
    },
    {
        id: 7,
        title: 'Turbo Pascal',
        mode: 'text/x-pascal',
    },
    {
        id: 8,
        title: 'Borland Delphi 6 - 14.5',
        mode: 'pascal',
    },
    {
        id: 9,
        title: 'Borland C',
        mode: 'text/x-csrc',
    },
    {
        id: 10,
        title: 'Borland C++',
        mode: 'text/x-c++src',
    },
    {
        id: 18,
        title: 'Java JDK 1.8',
        mode: 'text/x-java',
    },
    {
        id: 22,
        title: 'PHP PHP 7.1.13',
        mode: 'application/x-httpd-php',
    },
    {
        id: 23,
        title: 'Python 2.7.10',
        mode: {
            name: 'text/x-python',
            version: 2,
        },
    },
    {
        id: 24,
        title: 'Perl 5.26.1',
        mode: 'text/x-perl',
    },
    {
        id: 25,
        title: 'Mono C# 4.8',
        mode: 'text/x-csharp',
    },
    {
        id: 26,
        title: 'Ruby 2.4.3',
        mode: 'text/x-ruby',
    },
    {
        id: 27,
        title: 'Python 3.6.4',
        mode: {
            name: 'text/x-python',
            version: 3,
        },
    },
    {
        id: 28,
        title: 'Haskell GHC 8.0.2',
        mode: 'text/x-haskell',
    },
    {
        id: 29,
        title: 'FreeBASIC 1.05.0',
        mode: 'pascal',
    },
    {
        id: 30,
        title: 'PascalABC 3.1.0.1198',
        mode: 'text/x-pascal',
    },
    {
        id: 68,
        title: 'GNU C++ 5.3.1 + sanitizer',
        mode: 'text/x-c++src',
    },
];
